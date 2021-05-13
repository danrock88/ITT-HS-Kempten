/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package inttt.datenlogik;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

/**
 *
 * @author inttentwickler
 */
@Embeddable
public class RefillPK implements Serializable {

    @Basic(optional = false)
    @Column(name = "refillID")
    private int refillID;
    @Basic(optional = false)
    @NotNull
    @Column(name = "stationID")
    private int stationID;
    @Basic(optional = false)
    @NotNull
    @Column(name = "productID")
    private int productID;

    public RefillPK() {
    }

    public RefillPK(int refillID, int stationID, int productID) {
        this.refillID = refillID;
        this.stationID = stationID;
        this.productID = productID;
    }

    public int getRefillID() {
        return refillID;
    }

    public void setRefillID(int refillID) {
        this.refillID = refillID;
    }

    public int getStationID() {
        return stationID;
    }

    public void setStationID(int stationID) {
        this.stationID = stationID;
    }

    public int getProductID() {
        return productID;
    }

    public void setProductID(int productID) {
        this.productID = productID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) refillID;
        hash += (int) stationID;
        hash += (int) productID;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof RefillPK)) {
            return false;
        }
        RefillPK other = (RefillPK) object;
        if (this.refillID != other.refillID) {
            return false;
        }
        if (this.stationID != other.stationID) {
            return false;
        }
        if (this.productID != other.productID) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "inttt.datenlogik.RefillPK[ refillID=" + refillID + ", stationID=" + stationID + ", productID=" + productID + " ]";
    }
    
}
