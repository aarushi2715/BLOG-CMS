import Category from '../models/Category.js';
import {generateSlug} from '../utils/generateSlug.js';

export const createCategory = async (req, res)=>{
    try{
         // 1. extract name
         const {name} = req.body;

        // 2. generate slug
        if(!name || !name.trim()){
            return res.status(400).json({
                message: "category name is required for creating",
            })
        }
        const slug = generateSlug(name);

        // 3. create category using Category.create()
        const category = await Category.create({
            name, //javascript shorthand
            slug,
    });

        res.status(201).json({
            category,
            message: "category created successfully",
        })

        // 4. send status 201 + categorys


    }catch(error){
        res.status(400).json({
            message: error.message,
        })

    }

};

export const getAllCategory = async(req, res)=>{
    try{
        //fins all category and store them
        const allCategory = await Category.find().sort({name: 1});//ascending order 

        //senc 200 statud
        res.status(200).json({
            message: "All categoruies fetched successfully",
            allCategory,
        })

    }catch(error){
        res.status(500).json({
            message: error.message,
        })

    }

};

export const getOneCategory = async(req, res)=>{

    try{
        const category = await Category.findOne({ name: req.params.name});

        if(!category){
            return res.status(404).json({
                message: "category not found",
            })
        }

    res.status(200).json({
        message: "fetched one category successfully",
        category,
    })
}catch(error){
    res.status(500).json({
        message: error.message,
    })
}


};

export const updateCategory = async(req, res)=>{
      try {
        // 1. Get id from req.params
        const {id} = req.params;
   

        // 2. Get new name from req.body
             const {name} = req.body;


        // 3. Generate the new slug
        console.log(req.body);
        console.log(name);
        if (!name || !name.trim()) {
            return res.status(400).json({
            message: "Category name is required"
            });
        }

        const slug = generateSlug(name);

        // 4. Find category by id and update it
        // Hint: Category.findByIdAndUpdate(...)
        const newCategory = await Category.findByIdAndUpdate(
            id, 
            {
              name: name,
              slug,
            },
              { returnDocument: "after" },//return the u[dates data istead of the old one]
        );
         if(!newCategory){
            return res.status(404).json({
                message: "category not found",
            })
        }

        // 5. Return updated category with status 200
        res.status(200).json({
            message: "category updated successfulyy",
            newCategory,
        })


    } catch (error) {
        //for incalid id format
         if (error.name === "CastError") {
        return res.status(400).json({
            message: "Invalid category ID"
        });
    }
        res.status(500).json({
            message: error.message,
        })
    }
    
};

export const deleteCategory = async(req, res)=>{
    try {
        // 1. Get id from req.params
        const id = req.params.id;

        // 2. Find category by ID and delete it
        // Hint: Category.findByIdAndDelete(id)

         const delCategory = await Category.findByIdAndDelete(id);
         if(!delCategory){
            return res.status(404).json({
                message: "category not found",
            })
         }

        // 3. Send status 200 response
        res.status(200).json({
            message: "category deleted successfully",
            delCategory,
        })

    } catch (error) {
         if (error.name === "CastError") {
        return res.status(400).json({
            message: "Invalid category ID"
        });
    }
       res.status(500).json({
        message: error.message,
       })
    }   


};