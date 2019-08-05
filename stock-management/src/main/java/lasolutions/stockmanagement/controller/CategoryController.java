package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.Catagory.CategoryModel;
import lasolutions.stockmanagement.Catagory.CategoryRepository;
import lasolutions.stockmanagement.Catagory.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryController(CategoryService categoryService, CategoryRepository categoryRepository) {
        this.categoryService = categoryService;
        this.categoryRepository = categoryRepository;
    }

    @RequestMapping(value = "/categories", method = RequestMethod.GET)
    public ModelAndView showCategories() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("categories");
        modelAndView.addObject("categories", categoryRepository.getCategories());
        return modelAndView;
    }

    @RequestMapping(value = "/save-category", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> saveCategory(
            @RequestParam("category_id") String category_id,
            @RequestParam("category_name") String category_name,
            @RequestParam("remark") String remark,
            @RequestParam("inactive") Boolean inactive) {

        CategoryModel categoryModel = new CategoryModel();
        if (category_id.isEmpty()) {
            category_id = categoryRepository.getCategoryId();
        }
        categoryModel.setCategory_id(category_id);
        categoryModel.setCategory_name(category_name);
        categoryModel.setRemark(remark);
        categoryModel.setInactive(inactive);
        categoryRepository.save(categoryModel);
        return new ResponseEntity<>(categoryRepository.getCategories(), HttpStatus.OK);
    }

    @RequestMapping(value = "/categories/view/{category_id}", method = RequestMethod.GET)
    public ResponseEntity<Object> viewCategory(@PathVariable("category_id") String category_id) {
        CategoryModel category = categoryRepository.getCategoryById(category_id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }
}
