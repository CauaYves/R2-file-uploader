# Installation Guide

you will need NodeJs 20.6 version, check atual version using node -v on terminal.

clone this app to your folder and run:

    npm install

you will need create a bucket on cloudlare R2 on https://dash.cloudflare.com/, Insert your environments variables from R2 in .env file following the .env.example.

now will just need create the database, run:

    npx prisma generate
    npx prisma migrate dev

now your database is sync with the schema.prisma file.

finally, run:

    npm run dev

and the server will be executed on port 4000.

any doubts, ask me on linkedin or email: cauayves5@gmail.com | https://www.linkedin.com/in/cauayves/
