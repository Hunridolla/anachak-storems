package lasolutions.stockmanagement.controller;

import lasolutions.stockmanagement.ExchangeRate.ExModel;
import lasolutions.stockmanagement.ExchangeRate.ExRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;

@Controller
public class ExchangeController {

    @Autowired
    private ExRepository exRepository;

    @Autowired
    public ExchangeController( ExRepository exRepository){
        this.exRepository = exRepository;
    }

    @RequestMapping(value = "/exchange-rate", method = RequestMethod.GET)
    public ModelAndView showExchange(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("exchange-rate");
        return  modelAndView;
    }

    @RequestMapping(value = "/save-exchange-rate", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> saveExRate(
            @RequestParam("ex_id") String ex_id,
            @RequestParam("ex_type") String ex_type,
            @RequestParam("buy_rate") double buy_rate,
            @RequestParam("sell_rate") double sell_rate,
            @RequestParam("mid_rate") double mid_rate,
            @RequestParam("effective_date") Date effective_date
    ){
        ExModel exModel;
        exModel = new ExModel();
        if (ex_id.isEmpty()){
            ex_id = exRepository.getExId();
        }
        exModel.setEx_id(ex_id);
        exModel.setEx_type(ex_type);
        exModel.setBuy_rate(buy_rate);
        exModel.setSell_rate(sell_rate);
        exModel.setMid_rate(mid_rate);
        exModel.setEffective_date(effective_date);
        exRepository.save(exModel);
        return new ResponseEntity<>(exModel, HttpStatus.OK);
    }
}
