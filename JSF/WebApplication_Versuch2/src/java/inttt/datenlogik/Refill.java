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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "refill")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Refill.findAll", query = "SELECT r FROM Refill r"),
    @NamedQuery(name = "Refill.findByRefillID", query = "SELECT r FROM Refill r WHERE r.refillPK.refillID = :refillID"),
    @NamedQuery(name = "Refill.findByStationID", query = "SELECT r FROM Refill r WHERE r.refillPK.stationID = :stationID"),
    @NamedQuery(name = "Refill.findByProductID", query = "SELECT r FROM Refill r WHERE r.refillPK.productID = :productID"),
    @NamedQuery(name = "Refill.findByAmount", query = "SELECT r FROM Refill r WHERE r.amount = :amount"),
    @NamedQuery(name = "Refill.findByTimestamp", query = "SELECT r FROM Refill r WHERE r.timestamp = :timestamp"),
    @NamedQuery(name = "Refill.findBySupplier", query = "SELECT r FROM Refill r WHERE r.supplier = :supplier")})
public class Refill implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected RefillPK refillPK;
    @Basic(optional = false)
    @NotNull
    @Column(name = "amount")
    private int amount;
    @Basic(optional = false)
    @NotNull
    @Column(name = "timestamp")
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;
    @Basic(optional = false)
    @NotNull
    @Column(name = "supplier")
    private int supplier;
    @JoinColumn(name = "productID", referencedColumnName = "productID", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Products products;
    @JoinColumn(name = "stationID", referencedColumnName = "stationID", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Station station;

    public Refill() {
    }

    public Refill(RefillPK refillPK) {
        this.refillPK = refillPK;
    }

    public Refill(RefillPK refillPK, int amount, Date timestamp, int supplier) {
        this.refillPK = refillPK;
        this.amount = amount;
        this.timestamp = timestamp;
        this.supplier = supplier;
    }

    public Refill(int refillID, int stationID, int productID) {
        this.refillPK = new RefillPK(refillID, stationID, productID);
    }

    public RefillPK getRefillPK() {
        return refillPK;
    }

    public void setRefillPK(RefillPK refillPK) {
        this.refillPK = refillPK;
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

    public int getSupplier() {
        return supplier;
    }

    public void setSupplier(int supplier) {
        this.supplier = supplier;
    }

    public Products getProducts() {
        return products;
    }

    public void setProducts(Products products) {
        this.products = products;
    }

    public Station getStation() {
        return station;
    }

    public void setStation(Station station) {
        this.station = station;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (refillPK != null ? refillPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Refill)) {
            return false;
        }
        Refill other = (Refill) object;
        if ((this.refillPK == null && other.refillPK != null) || (this.refillPK != null && !this.refillPK.equals(other.refillPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "inttt.datenlogik.Refill[ refillPK=" + refillPK + " ]";
    }
    
}
