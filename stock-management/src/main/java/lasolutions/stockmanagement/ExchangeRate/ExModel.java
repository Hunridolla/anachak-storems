package lasolutions.stockmanagement.ExchangeRate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "tbl_exchange_rates")
public class ExModel {
    public ExModel(){

    }
    @Id
    @Column(name = "ex_id", insertable = false, updatable = false)
    private String ex_id;

    @Column(name = "ex_type")
    private String ex_type;

    @Column(name = "buy_rate")
    private double buy_rate;

    @Column(name = "sell_rate")
    private double sell_rate;

    @Column(name = "mid_rate")
    private double mid_rate;

    @Column(name = "effective_date")
    private Date effective_date;

    public String getEx_id() {
        return ex_id;
    }

    public void setEx_id(String ex_id) {
        this.ex_id = ex_id;
    }

    public String getEx_type() {
        return ex_type;
    }

    public void setEx_type(String ex_type) {
        this.ex_type = ex_type;
    }

    public double getBuy_rate() {
        return buy_rate;
    }

    public void setBuy_rate(double buy_rate) {
        this.buy_rate = buy_rate;
    }

    public double getSell_rate() {
        return sell_rate;
    }

    public void setSell_rate(double sell_rate) {
        this.sell_rate = sell_rate;
    }

    public Date getEffective_date() {
        return effective_date;
    }

    public void setEffective_date(Date effective_date) {
        this.effective_date = effective_date;
    }

    public double getMid_rate() {
        return mid_rate;
    }

    public void setMid_rate(double mid_rate) {
        this.mid_rate = mid_rate;
    }
}
