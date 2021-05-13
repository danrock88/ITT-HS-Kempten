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
public class SalePK implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Column(name = "saleID")
    private int saleID;
    @Basic(optional = false)
    @NotNull
    @Column(name = "productID")
    private int productID;
    @Basic(optional = false)
    @NotNull
    @Column(name = "stationID")
    private int stationID;

    public SalePK() {
    }

    public SalePK(int saleID, int productID, int stationID) {
        this.saleID = saleID;
        this.productID = productID;
        this.stationID = stationID;
    }

    public int getSaleID() {
        return saleID;
    }

    public void setSaleID(int saleID) {
        this.saleID = saleID;
    }

    public int getProductID() {
        return productID;
    }

    public void setProductID(int productID) {
        this.productID = productID;
    }

    public int getStationID() {
        return stationID;
    }

    public void setStationID(int stationID) {
        this.stationID = stationID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) saleID;
        hash += (int) productID;
        hash += (int) stationID;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof SalePK)) {
            return false;
        }
        SalePK other = (SalePK) object;
        if (this.saleID != other.saleID) {
            return false;
        }
        if (this.productID != other.productID) {
            return false;
        }
        if (this.stationID != other.stationID) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "inttt.datenlogik.SalePK[ saleID=" + saleID + ", productID=" + productID + ", stationID=" + stationID + " ]";
    }
    
}
