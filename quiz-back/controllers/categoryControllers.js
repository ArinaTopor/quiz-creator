import CategoryModel from '../models/category.js';
export const createCat = async (req, res) => {
    try {
        const doc = new CategoryModel({
            name: req.body.name,
        });

        const cat = await doc.save();
        res.json(cat);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            massage: 'Не удалось создать категорию',
        });
    }
};
