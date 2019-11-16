package lasolutions.stockmanagement.Catagory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<CategoryModel, String> {

    String getCategories = "CALL GBL_GET_CATEGORIES()";

    @Query(value = getCategories, nativeQuery = true)
    List<CategoryModel> getCategories();

    String getCategoryById = "CALL GBL_SHOW_CATEGORY_INFO(:category_id)";

    @Query(value = getCategoryById, nativeQuery = true)
    CategoryModel getCategoryById(@Param("category_id") String category_id);

    String getCategoryId = "CALL GBL_GET_CATEGORY_ID()";
    @Query(value = getCategoryId, nativeQuery = true)
    String getCategoryId();
}
