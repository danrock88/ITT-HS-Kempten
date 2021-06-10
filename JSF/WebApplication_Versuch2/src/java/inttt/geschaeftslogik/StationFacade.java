/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package inttt.geschaeftslogik;

import inttt.datenlogik.Station;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author inttentwickler
 */
@Stateless
public class StationFacade extends AbstractFacade<Station> {

    @PersistenceContext(unitName = "WebApplication_Versuch2PU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public StationFacade() {
        super(Station.class);
    }
    public List<String> getLocationDistinct(){
        List<String> location= em.createNamedQuery("Station.getLocationDistinct").getResultList();
        return location;
    }
    
}
