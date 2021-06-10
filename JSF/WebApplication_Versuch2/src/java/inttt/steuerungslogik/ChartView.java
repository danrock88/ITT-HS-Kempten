/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package inttt.steuerungslogik;

import inttt.datenlogik.Inventory;
import inttt.datenlogik.Products;
import java.io.Serializable;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import javax.faces.bean.ManagedBean;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import org.primefaces.event.ItemSelectEvent;
import org.primefaces.model.chart.Axis;
import org.primefaces.model.chart.AxisType;
import org.primefaces.model.chart.BarChartModel;
import org.primefaces.model.chart.ChartSeries;
import org.primefaces.model.chart.PieChartModel;

/**
 *
 * @author inttentwickler
 */
@ManagedBean
public class ChartView implements Serializable {

    private PieChartModel pieModel;
    private BarChartModel barModel;
    
    @EJB
    private inttt.geschaeftslogik.ProductsFacade productFacade;
    @EJB
    private inttt.geschaeftslogik.InventoryFacade inventoryFacade;
    
    @PostConstruct
    public void init()
    {
        createPieModels();
        createBarModels();
    }
    
    //Tortendiagramm
    public PieChartModel getPieModel(){
        return  pieModel;
    }
    private void createPieModels(){
        createPieModel();
    }
    
    //Balkendiagramm
    
   private void createBarModels(){
       createBarModel();
   }
    public BarChartModel getBarModel(){
        return  barModel;
    }
    
    
    //Anteile eines Produktes am Gesamtlagerbestand
    private void createPieModel(){
        
        pieModel = new PieChartModel();
        
        List<Products> inventoryList = productFacade.allProducts();
        
        Iterator<Products> iterator = inventoryList.iterator();
        while(iterator.hasNext()){
            Products prod = (Products) iterator.next();
            pieModel.set(prod.getName(), getSelectedProductAmount(prod.getProductID()));
        }
        
        pieModel.setTitle("Anteile eines Produktes am Gesamtlagerbestand");
        pieModel.setLegendPosition("e");
        pieModel.setFill(true);
        pieModel.setShowDataLabels(true);
        pieModel.setDiameter(150);
        
    }
    
    private void createBarModel(){
        barModel = initBarModel();
        
        
        barModel.setTitle("Produktinformationen");
        barModel.setLegendPosition("ne");
        
        Axis xAxis= barModel.getAxis(AxisType.X);
        xAxis.setLabel("Produkte");
        
        Axis yAxis= barModel.getAxis(AxisType.Y);
        yAxis.setLabel("Preise/Kosten");
        yAxis.setMin(0);
        yAxis.setMax(4);
        
    }
    
    private BarChartModel initBarModel(){
        BarChartModel model = new BarChartModel();
        
        ChartSeries price = new ChartSeries();
        price.setLabel("Preis");
        
        ChartSeries cost = new ChartSeries();
        cost.setLabel("Herstellerkosten");
        
        List<Products> inventoryList = productFacade.allProducts();
        
        Iterator<Products> iterator = inventoryList.iterator();
        while(iterator.hasNext()){
            Products prod = (Products) iterator.next();
            price.set(prod.getName(), prod.getPrice());
            
            //Zufallsgenerator für Produktionskosten
            String randomnumber = "";
            Random randomgenerator = new Random();
            
            for(int i =0; i<1; i++){
                int zahl = randomgenerator.nextInt(2);
                randomnumber +=zahl;
            }
            for(int i =0; i<1; i++){
                int zahl = randomgenerator.nextInt(99);
                randomnumber +="."+zahl;
            }
            cost.set(prod.getName(), Float.parseFloat(randomnumber));
            
        }
        model.addSeries(price);
        model.addSeries(cost);
        
        return model;
    }
    //Selector
    public void  itemSelect (ItemSelectEvent event){
        
        FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "item selected",
                            "Item Index: " + event.getItemIndex() + ", Series Index: " + event.getSeriesIndex());
        FacesContext.getCurrentInstance().addMessage(null,msg);
    }
    
        public Integer getSelectedProductAmount(java.lang.Integer productID){
        
        List<Inventory> inventoryList = inventoryFacade.inventoryByProduct(productID);
        int amount = 0;
        Iterator<Inventory> iterator = inventoryList.iterator();
        while(iterator.hasNext()){
           Inventory inv = (Inventory) iterator.next();
           amount += inv.getCurrentAmount();
        }
        return amount;
    }
}
