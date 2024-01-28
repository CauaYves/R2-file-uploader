import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import express from "express";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "./lib/cloudflare";
import { randomUUID } from "crypto";
import { getFileParamsSchema, uploadBodySchema } from "./schemas/fileSchema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const server = express()
server
    .use(express.json())
    .get("/health", (_req, res) => { res.send( "server running ok ✅" ) })
    .post("/uploads", async (req, res) => {
        const { name, contentType } = uploadBodySchema.parse(req.body)

        const fileKey = randomUUID().concat("-").concat(name)
        const signedUrl = await getSignedUrl(
            r2,
            new PutObjectCommand({
                Bucket: "files",
                Key: fileKey,
            }),
            { expiresIn: 600 },
        )
        const file = await prisma.file.create({
            data: {
                name,
                contentType,
                key: fileKey
            }
        })
        res.send({ signedUrl, fileId: file.id })
    })
    
    .get("/uploads/:id", async (req, res) => {
        const { id } = getFileParamsSchema.parse(req.params)

        const file = await prisma.file.findUniqueOrThrow({
            where: {
                id
            }
        })

        const signedUrl = await getSignedUrl(
            r2,
            new GetObjectCommand({
                Bucket: "files",
                Key: file.key
            }),
            { expiresIn: 600 },
        )

        return res.send(signedUrl)
    })

server.listen(4000, () => {console.log("✅ Server listening on port 4000.")})