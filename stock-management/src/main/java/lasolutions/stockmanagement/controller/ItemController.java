package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.Catagory.CategoryRepository;
import lasolutions.stockmanagement.CostMethod.CostMethodRepository;
import lasolutions.stockmanagement.Item.ItemModel;
import lasolutions.stockmanagement.Item.ItemRepository;
import lasolutions.stockmanagement.StockType.StockTypeRepository;
import lasolutions.stockmanagement.UnitMeasure.UnitMeasureRepository;
import lasolutions.stockmanagement.Vendor.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;
    private StockTypeRepository stockTypeRepository;
    private CategoryRepository categoryRepository;
    private VendorRepository vendorRepository;
    private CostMethodRepository costMethodRepository;
    private UnitMeasureRepository unitMeasureRepository;

    @Autowired
    public ItemController(ItemRepository itemRepository, StockTypeRepository stockTypeRepository,
                          VendorRepository vendorRepository, CategoryRepository categoryRepository, CostMethodRepository costMethodRepository,
                          UnitMeasureRepository unitMeasureRepository) {
        this.itemRepository = itemRepository;
        this.stockTypeRepository = stockTypeRepository;
        this.categoryRepository = categoryRepository;
        this.vendorRepository = vendorRepository;
        this.costMethodRepository = costMethodRepository;
        this.unitMeasureRepository = unitMeasureRepository;
    }

    @RequestMapping(value = "/items", method = RequestMethod.GET)
    public ModelAndView showItem() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("stockTypes", stockTypeRepository.getStockTypes());
        modelAndView.addObject("categories", categoryRepository.getCategories());
        modelAndView.addObject("prefered_supplier", vendorRepository.getVendors());
        modelAndView.addObject("cost_methods", costMethodRepository.getCostMethods());
        modelAndView.addObject("unit_measures", unitMeasureRepository.getUnitMeasures());
        modelAndView.setViewName("items");
        return modelAndView;
    }

    @RequestMapping(value = "/save-item", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> saveItem(
            @RequestParam("item_id") String item_id,
            @RequestParam("item_name") String item_name,
            @RequestParam("stock_type") String stock_type,
            @RequestParam("category_id") String category_id,
            @RequestParam("um") String um,
            @RequestParam("cost_method") String cost_method,
            @RequestParam("cost") double cost,
            @RequestParam("sale_price") double sale_price,
            @RequestParam("prefered_supplier") String prefered_supplier,
            @RequestParam("min_balance") Integer min_balance,
            @RequestParam("max_balance") Integer max_balance,
            @RequestParam("barcode") String barcode,
            @RequestParam("remark") String remark,
            @RequestParam("inactive") Boolean inactive) {
        ItemModel itemModel;
        itemModel = new ItemModel();
        itemModel.setItem_id(item_id);
        itemModel.setItem_name(item_name);
        itemModel.setStock_type(stock_type);
        itemModel.setCategory_id(category_id);
        itemModel.setUM(um);
        itemModel.setCost_method(cost_method);
        itemModel.setCost(cost);
        itemModel.setSale_price(sale_price);
        itemModel.setPrefered_supplier(prefered_supplier);
        itemModel.setMin_balance(min_balance);
        itemModel.setMax_balance(max_balance);
        itemModel.setBarcode(barcode);
        itemModel.setRemark(remark);
        itemModel.setInactive(inactive);
        itemRepository.save(itemModel);
        return new ResponseEntity<>(itemModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/items/view/{item_id}", method = RequestMethod.GET)
    public ResponseEntity<Object> viewItem(@PathVariable("item_id") String item_id) {
        ItemModel itemModel = itemRepository.getItemById(item_id);
        return new ResponseEntity<>(itemModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/items/get/all", method = RequestMethod.GET)
    public ResponseEntity<Object> getItems() {
        List<ItemModel> items = itemRepository.getItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }


}

