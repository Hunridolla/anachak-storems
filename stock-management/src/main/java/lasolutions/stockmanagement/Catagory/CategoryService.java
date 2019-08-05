package lasolutions.stockmanagement.Catagory;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    public List<CategoryModel> getCategories();

    public CategoryModel getCategoryById(String category_id);

    public String getCategoryId();
}
