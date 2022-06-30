const categoryController = require('../../../controllers/category.controller');
const Model = require('../../../models');
const CategoryModel = Model.category;
const newCategory = require('../../mock-data/new-category.json');
const { mockRequest, mockResponse } = require('../interceptor');

let req, res;

beforeEach( () => {
    req = mockRequest();
    res = mockResponse();
})

describe('categoryController.create', () => {
    beforeEach( () => {
        req.body = newCategory;
    })
    test('should call categoryController.create and should create a new categoyr', async () => {
       
       let spy =  jest.spyOn(CategoryModel,'create')
        .mockImplementation((newCategory) => Promise.resolve(newCategory));

        await categoryController.create(req,res);
        expect(spy).toHaveBeenCalled();
        expect(CategoryModel.create).toHaveBeenCalledWith(newCategory);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(newCategory);

    })
    
    // test('should call categoryController.create and ends with an error', async () => {
         
    //    let spy =  jest.spyOn(CategoryModel,'create')
    //    .mockImplementation((newCategory) => Promise.reject("error"));

    //    await categoryController.create(req,res);
    //    expect(spy).toHaveBeenCalled();
    //    expect(CategoryModel.create).toHaveBeenCalledWith(newCategory);
    //    expect(res.status).toHaveBeenCalledWith(500);
    //    expect(res.send).toHaveBeenCalledWith({
    //         message:"some internal error while creating category"
    //     });

    // })
})

describe('categoryController.findAll', () => {

    test('should call CategoryController.findAll with a query value', async () => {
        const queryParam = {
            where: {
                name: "Electronics"
            }
        };

        const spy = jest.spyOn(CategoryModel, 'findAll')
        .mockImplementation((queryParam) => Promise.resolve(newCategory));
        
        req.query = {
            name: "Electronics"
        }

        await categoryController.findAll(req, res);
        
        expect(spy).toHaveBeenCalled();
        expect(CategoryModel.findAll).toHaveBeenCalledWith(queryParam);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newCategory);
        
    })
})