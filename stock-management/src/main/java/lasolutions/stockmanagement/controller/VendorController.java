package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.Vendor.VendorModel;
import lasolutions.stockmanagement.Vendor.VendorRepository;
import lasolutions.stockmanagement.VendorType.VendorTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class VendorController {

    @Autowired
    private VendorRepository vendorRepository;
    private VendorTypeRepository vendorTypeRepository;

    @Autowired
    public VendorController(VendorRepository vendorRepository, VendorTypeRepository vendorTypeRepository) {
        this.vendorRepository = vendorRepository;
        this.vendorTypeRepository = vendorTypeRepository;
    }

    @RequestMapping(value = "/vendors", method = RequestMethod.GET)
    public ModelAndView showVendors() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("vendors");
        modelAndView.addObject("types", vendorTypeRepository.getVendorTypes());
        return modelAndView;
    }

    @RequestMapping(value = "/save-vendor", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> saveVendor(
            @RequestParam("vendor_id") String vendor_id,
            @RequestParam("vendor_type") String vendor_type,
            @RequestParam("company_name") String company_name,
            @RequestParam("company_name_khmer") String company_name_khmer,
            @RequestParam("title") String title,
            @RequestParam("first_name") String first_name,
            @RequestParam("last_name") String last_name,
            @RequestParam("contact") String contact,
            @RequestParam("phone") String phone,
            @RequestParam("email") String email,
            @RequestParam("website") String website,
            @RequestParam("address_detail") String address_detail,
            @RequestParam("remark") String remark,
            @RequestParam("inactive") Boolean inactive) {

        VendorModel vendorModel = new VendorModel();
        if (vendor_id.isEmpty()) {
            vendor_id = vendorRepository.getVendorId();
        }
        vendorModel.setVendor_id(vendor_id);
        vendorModel.setVendor_type(vendor_type);
        vendorModel.setCompany_name(company_name);
        vendorModel.setCompany_name_khmer(company_name_khmer);
        vendorModel.setTitle(title);
        vendorModel.setFirst_name(first_name);
        vendorModel.setLast_name(last_name);
        vendorModel.setContact(contact);
        vendorModel.setPhone(phone);
        vendorModel.setEmail(email);
        vendorModel.setWebsite(website);
        vendorModel.setAddress_detail(address_detail);
        vendorModel.setRemark(remark);
        vendorModel.setInactive(inactive);
        vendorRepository.save(vendorModel);
        return new ResponseEntity<>(vendorModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/vendors/view/{vendor_id}", method = RequestMethod.GET)
    public ResponseEntity<Object> viewVendorType(@PathVariable("vendor_id") String vendor_id) {
        VendorModel vendor = vendorRepository.getVendorById(vendor_id);
        return new ResponseEntity<>(vendor, HttpStatus.OK);
    }

    @RequestMapping(value = "/vendors/get/all", method = RequestMethod.GET)
    public ResponseEntity<Object> getVendors() {
        List<VendorModel> vendors = vendorRepository.getVendors();
        return new ResponseEntity<>(vendors, HttpStatus.OK);
    }
}
