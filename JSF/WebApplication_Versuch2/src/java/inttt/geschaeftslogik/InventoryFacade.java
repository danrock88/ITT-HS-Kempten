/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package inttt.geschaeftslogik;

import inttt.datenlogik.Inventory;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 *
 * @author inttentwickler
 */
@Stateless
public class InventoryFacade extends AbstractFacade<Inventory> {

    @PersistenceContext(unitName = "WebApplication_Versuch2PU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public InventoryFacade() {
        super(Inventory.class);
    }
    
    //###### eigene Methode #####
    public List<Inventory> inventoryByStation(java.lang.Integer stationID){
        List<Inventory> inv = em.createNamedQuery("Inventory.findByStationID")
                .setParameter("stationID", stationID)
                .getResultList();
        return inv;
    }
    
    public List<Inventory> inventoryByProduct(java.lang.Integer productID){
        List<Inventory> inv = em.createNamedQuery("Inventory.findByProductID")
                .setParameter("productID", productID)
                .getResultList();
        return inv;
    }
    //#####
    
}
