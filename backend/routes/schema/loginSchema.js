import zod from 'zod'

const loginSchema = zod.object({
    email : zod.string().email(),
    password : zod.string()
})

export default loginSchema;