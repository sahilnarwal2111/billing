import zod from 'zod'

const signupSchema = zod.object({
    email : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string()
})

export default signupSchema;