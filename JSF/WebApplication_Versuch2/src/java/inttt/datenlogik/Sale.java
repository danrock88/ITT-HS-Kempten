/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package inttt.datenlogik;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author inttentwickler
 */
@Entity
@Table(name = "sale")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Sale.findAll", query = "SELECT s FROM Sale s"),
    @NamedQuery(name = "Sale.findBySaleID", query = "SELECT s FROM Sale s WHERE s.salePK.saleID = :saleID"),
    @NamedQuery(name = "Sale.findByProductID", query = "SELECT s FROM Sale s WHERE s.salePK.productID = :productID"),
    @NamedQuery(name = "Sale.findByStationID", query = "SELECT s FROM Sale s WHERE s.salePK.stationID = :stationID"),
    @NamedQuery(name = "Sale.findByAmount", query = "SELECT s FROM Sale s WHERE s.amount = :amount"),
    @NamedQuery(name = "Sale.findByTimestamp", query = "SELECT s FROM Sale s WHERE s.timestamp = :timestamp")})
public class Sale implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected SalePK salePK;
    @Basic(optional = false)
    @NotNull
    @Column(name = "amount")
    private int amount;
    @Basic(optional = false)
    @NotNull
    @Column(name = "timestamp")
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    public Sale() {
    }

    public Sale(SalePK salePK) {
        this.salePK = salePK;
    }

    public Sale(SalePK salePK, int amount, Date timestamp) {
        this.salePK = salePK;
        this.amount = amount;
        this.timestamp = timestamp;
    }

    public Sale(int saleID, int productID, int stationID) {
        this.salePK = new SalePK(saleID, productID, stationID);
    }

    public SalePK getSalePK() {
        return salePK;
    }

    public void setSalePK(SalePK salePK) {
        this.salePK = salePK;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (salePK != null ? salePK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Sale)) {
            return false;
        }
        Sale other = (Sale) object;
        if ((this.salePK == null && other.salePK != null) || (this.salePK != null && !this.salePK.equals(other.salePK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "inttt.datenlogik.Sale[ salePK=" + salePK + " ]";
    }
    
}
