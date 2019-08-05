package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.VendorType.VendorTypeModel;
import lasolutions.stockmanagement.VendorType.VendorTypeRepository;
import lasolutions.stockmanagement.VendorType.VendorTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class VendorTypeController {

    @Autowired
    private VendorTypeService vendorTypeService;
    private VendorTypeRepository vendorTypeRepository;

    @Autowired
    public VendorTypeController(VendorTypeService vendorTypeService, VendorTypeRepository vendorTypeRepository) {
        this.vendorTypeService = vendorTypeService;
        this.vendorTypeRepository = vendorTypeRepository;
    }

    @RequestMapping(value = "/vendor-types", method = RequestMethod.GET)
    public ModelAndView showVendorTypes() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("vendor-types");
        modelAndView.addObject("vendorTypes", vendorTypeRepository.getVendorTypes());
        return modelAndView;
    }

    @RequestMapping(value = "/save-vendor-type", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> saveVendorType(
            @RequestParam("vendor_type_id") String vendor_type_id,
            @RequestParam("vendor_type_name") String vendor_type_name,
            @RequestParam("remark") String remark,
            @RequestParam("inactive") Boolean inactive) {

        VendorTypeModel vendorTypeModel = new VendorTypeModel();
        if (vendor_type_id.isEmpty()) {
            vendor_type_id = vendorTypeRepository.getVendorTypeId();
        }
        vendorTypeModel.setVendor_type_id(vendor_type_id);
        vendorTypeModel.setVendor_type_name(vendor_type_name);
        vendorTypeModel.setRemark(remark);
        vendorTypeModel.setInactive(inactive);
        vendorTypeRepository.save(vendorTypeModel);
        return new ResponseEntity<>(vendorTypeRepository.getVendorTypes(), HttpStatus.OK);
    }

    @RequestMapping(value = "/vendor-types/view/{vendor_type_id}", method = RequestMethod.GET)
    public ResponseEntity<Object> viewVendorType(@PathVariable("vendor_type_id") String vendor_type_id) {
        VendorTypeModel vendorType = vendorTypeRepository.getVendorTypeById(vendor_type_id);
        return new ResponseEntity<>(vendorType, HttpStatus.OK);
    }
}
