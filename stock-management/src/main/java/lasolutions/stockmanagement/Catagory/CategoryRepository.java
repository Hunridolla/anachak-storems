package lasolutions.stockmanagement.Catagory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<CategoryModel, String> {

    String getCategories = "SELECT category_id, category_name, remark, inactive FROM tbl_categories";

    @Query(value = getCategories, nativeQuery = true)
    List<CategoryModel> getCategories();

    String getCategoryById = "SELECT category_id, category_name, remark, inactive FROM tbl_categories WHERE category_id= :category_id";

    @Query(value = getCategoryById, nativeQuery = true)
    CategoryModel getCategoryById(@Param("category_id") String category_id);

    String getCategoryId = "SELECT CONCAT('CAT-' , LPAD(RIGHT(MAX(category_id),3) + 1,3,0)) as category_id FROM tbl_categories";
    @Query(value = getCategoryId, nativeQuery = true)
    String getCategoryId();
}
