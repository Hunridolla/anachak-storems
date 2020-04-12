package lasolutions.stockmanagement.PayBillDetail;


import javax.persistence.*;

@Entity
@Table(name = "tbl_payment_details")
public class PayBillDetailModel {
    public PayBillDetailModel(){

    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "paid_id")
    private String paid_id;

    @Column(name = "bill_id")
    private String bill_id;

    @Column (name = "disc_amt")
    private float disc_amt;

    @Column (name = "pay_amt")
    private float pay_amt;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPaid_id() {
        return paid_id;
    }

    public void setPaid_id(String paid_id) {
        this.paid_id = paid_id;
    }

    public String getBill_id() {
        return bill_id;
    }

    public void setBill_id(String bill_id) {
        this.bill_id = bill_id;
    }

    public float getDisc_amt() {
        return disc_amt;
    }

    public void setDisc_amt(float disc_amt) {
        this.disc_amt = disc_amt;
    }

    public float getPay_amt() {
        return pay_amt;
    }

    public void setPay_amt(float pay_amt) {
        this.pay_amt = pay_amt;
    }
}
