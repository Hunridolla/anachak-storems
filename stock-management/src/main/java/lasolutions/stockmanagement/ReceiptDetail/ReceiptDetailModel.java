package lasolutions.stockmanagement.ReceiptDetail;

import javax.persistence.*;

@Entity
@Table(name = "tbl_receipt_details")
public class ReceiptDetailModel {
    public  ReceiptDetailModel(){

    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "receipt_id")
    private String receipt_id;

    @Column(name = "inv_id")
    private String inv_id;

    @Column (name = "disc_amt")
    private float disc_amt;

    @Column (name = "receive_amt")
    private float receive_amt;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getReceipt_id() {
        return receipt_id;
    }

    public void setReceipt_id(String receipt_id) {
        this.receipt_id = receipt_id;
    }

    public String getInv_id() {
        return inv_id;
    }

    public void setInv_id(String inv_id) {
        this.inv_id = inv_id;
    }

    public float getDisc_amt() {
        return disc_amt;
    }

    public void setDisc_amt(float disc_amt) {
        this.disc_amt = disc_amt;
    }

    public float getReceive_amt() {
        return receive_amt;
    }

    public void setReceive_amt(float receive_amt) {
        this.receive_amt = receive_amt;
    }
}
