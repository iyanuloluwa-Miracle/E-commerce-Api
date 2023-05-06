const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


//get Product
exports.getProducts = async(req,res,next)=>{
    try{
        const products = await prisma.product.findMany({
            include: { category :true }
        })
        const categories = await prisma.category.findMany({

        })
        res.json({products, categories})

    }catch(error) {
        next(error)

    }

}

//get the particular id
exports.getProduct = async(req,res,next)=>{
    try{
        const {id } = req.params
        const product = await prisma.product.findUnique({
            where: {
                id: Number(id)
            },
            include: {category: true}

        })
    res.json(product)

    }catch(error){
        next(error)
    }

}

//addProduct

exports.addProduct = async(req,res,next)=>{
    try{
        const product = await prisma.product.create({
            data: req.body
        })
        res.json(product)

    }catch(error){
        next(error)
    }

}

//Delete a Product

exports.deleteProducts = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteProduct = await prisma.product.delete({
        where: {
          id: Number(id),
        },
      });
      if (!deleteProduct) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.status(200).json({ message: "Product successfully deleted" });
    } catch (error) {
      next(error);
    }
};
  

//Update a particular product
exports.updateProducts = async(req,res,next)=>{
    try{
        const {id} = req.params
        const product = await prisma.product.update({
            where: {
                id: Number(id),

            },
            data: req.body,
            include:{
                category: true

            }
        })
        res.json(product)
       

    }catch(error){
        next(error)
    }


}
