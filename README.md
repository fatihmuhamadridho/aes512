# PRISMA MIGRATE DEV DATABASE

npx prisma migrate dev --schema=./prisma/aes512.prisma
npx prisma migrate dev --schema=./prisma/spkahp.prisma

# PRISMA RESET DATABASE

npx prisma migrate reset --force --schema=./prisma/aes512.prisma
npx prisma migrate reset --force --schema=./prisma/spkahp.prisma

# GENERATE PRISMA SCHEMA ON SPECIFIC FILE

npx prisma generate --schema=./prisma/aes512.prisma
npx prisma generate --schema=./prisma/spkahp.prisma

# DATABASE PUSH PRISMA SCHEMA ON SPECIFIC FILE

npx prisma db push --schema=./prisma/aes512.prisma
npx prisma db push --schema=./prisma/spkahp.prisma

# DATABASE SEEDER

npx prisma db seed --schema=./prisma/aes512.prisma
npx prisma db seed --schema=./prisma/spkahp.prisma
