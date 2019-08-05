package lasolutions.stockmanagement.Catagory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("CategoryService")
public class CategoryServiceImplement implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryModel> getCategories() {
        return categoryRepository.getCategories();
    }

    @Override
    public CategoryModel getCategoryById(String category_id) {
        return categoryRepository.getCategoryById(category_id);
    }

    @Override
    public String getCategoryId() {
        return categoryRepository.getCategoryId();
    }
}
