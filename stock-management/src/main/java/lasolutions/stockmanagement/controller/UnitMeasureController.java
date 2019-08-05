package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.UnitMeasure.UnitMeasureModel;
import lasolutions.stockmanagement.UnitMeasure.UnitMeasureRepository;
import lasolutions.stockmanagement.UnitMeasure.UnitMeasureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UnitMeasureController {

    @Autowired
    private UnitMeasureService unitMeasureService;
    private UnitMeasureRepository unitMeasureRepository;

    @Autowired
    public UnitMeasureController(UnitMeasureService unitMeasureService, UnitMeasureRepository unitMeasureRepository) {
        this.unitMeasureService = unitMeasureService;
        this.unitMeasureRepository = unitMeasureRepository;
    }

    @RequestMapping(value = "/unit-measures", method = RequestMethod.GET)
    public ModelAndView showUnitMeasures() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("unit-measures");
        modelAndView.addObject("unitMeasures", unitMeasureRepository.getUnitMeasures());
        return modelAndView;
    }

    @RequestMapping(value = "/save-unit-measure", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> saveUnitMeasure(
            @RequestParam("unit_measure_id") String unit_measure_id,
            @RequestParam("unit_measure_name") String unit_measure_name,
            @RequestParam("remark") String remark,
            @RequestParam("inactive") Boolean inactive) {

        UnitMeasureModel unitMeasureModel = new UnitMeasureModel();
        if (unit_measure_id.isEmpty()) {
            unit_measure_id = unitMeasureRepository.getUnitMeasureId();
        }
        unitMeasureModel.setUnit_measure_id(unit_measure_id);
        unitMeasureModel.setUnit_measure_name(unit_measure_name);
        unitMeasureModel.setRemark(remark);
        unitMeasureModel.setInactive(inactive);
        unitMeasureRepository.save(unitMeasureModel);
        return new ResponseEntity<>(unitMeasureRepository.getUnitMeasures(), HttpStatus.OK);
    }

    @RequestMapping(value = "/unit-measures/view/{unit_measure_id}", method = RequestMethod.GET)
    public ResponseEntity<Object> viewCategory(@PathVariable("unit_measure_id") String unit_measure_id) {
        UnitMeasureModel unitMeasureModel = unitMeasureRepository.getUnitMeasureByID(unit_measure_id);
        return new ResponseEntity<>(unitMeasureModel, HttpStatus.OK);
    }
}
