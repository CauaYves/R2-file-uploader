# Installation Guide

You will need Node.js version 20.6; check the current version using `node -v` in the terminal.

Clone this application to your folder and run:

    npm install

You will need to create a bucket on Cloudflare R2 at https://dash.cloudflare.com/. Insert your R2 environment variables into the .env file following the .env.example.

Now, you just need to create the database. Run:

    npx prisma generate
    npx prisma migrate dev

Now, your database is synchronized with the schema.prisma file.

Finally, run:

    npm run dev

And the server will be executed on port 4000.

For any questions, contact me on LinkedIn or email: cauayves5@gmail.com | https://www.linkedin.com/in/cauayves/
