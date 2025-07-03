import zod from 'zod'

const billSchema = zod.object({
    customerName : zod.string(),
    items : zod.array(zod.object({
        itemName : zod.string(),
        quantity : zod.number(),
        amount : zod.number()
    }))
})

export default billSchema;