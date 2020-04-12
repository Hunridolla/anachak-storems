package lasolutions.stockmanagement.PublicModel;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class T3N3Model {
    public T3N3Model(){

    }
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String TField1;
    private String TField2;
    private String TField3;
    private float NField1;
    private float NField2;
    private float NField3;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTField1() {
        return TField1;
    }

    public void setTField1(String TField1) {
        this.TField1 = TField1;
    }

    public String getTField2() {
        return TField2;
    }

    public void setTField2(String TField2) {
        this.TField2 = TField2;
    }

    public String getTField3() {
        return TField3;
    }

    public void setTField3(String TField3) {
        this.TField3 = TField3;
    }

    public float getNField1() {
        return NField1;
    }

    public void setNField1(float NField1) {
        this.NField1 = NField1;
    }

    public float getNField2() {
        return NField2;
    }

    public void setNField2(float NField2) {
        this.NField2 = NField2;
    }

    public float getNField3() {
        return NField3;
    }

    public void setNField3(float NField3) {
        this.NField3 = NField3;
    }
}
