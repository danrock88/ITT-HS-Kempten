package inttt.steuerungslogik;

import inttt.datenlogik.Refill;
import inttt.steuerungslogik.util.JsfUtil;
import inttt.steuerungslogik.util.PaginationHelper;
import inttt.geschaeftslogik.RefillFacade;

import java.io.Serializable;
import java.util.ResourceBundle;
import javax.ejb.EJB;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;
import javax.faces.model.DataModel;
import javax.faces.model.ListDataModel;
import javax.faces.model.SelectItem;

@Named("refillController")
@SessionScoped
public class RefillController implements Serializable {

    private Refill current;
    private DataModel items = null;
    @EJB
    private inttt.geschaeftslogik.RefillFacade ejbFacade;
    private PaginationHelper pagination;
    private int selectedItemIndex;

    public RefillController() {
    }

    public Refill getSelected() {
        if (current == null) {
            current = new Refill();
            current.setRefillPK(new inttt.datenlogik.RefillPK());
            selectedItemIndex = -1;
        }
        return current;
    }

    private RefillFacade getFacade() {
        return ejbFacade;
    }

    public PaginationHelper getPagination() {
        if (pagination == null) {
            pagination = new PaginationHelper(10) {

                @Override
                public int getItemsCount() {
                    return getFacade().count();
                }

                @Override
                public DataModel createPageDataModel() {
                    return new ListDataModel(getFacade().findRange(new int[]{getPageFirstItem(), getPageFirstItem() + getPageSize()}));
                }
            };
        }
        return pagination;
    }

    public String prepareList() {
        recreateModel();
        return "List";
    }

    public String prepareView() {
        current = (Refill) getItems().getRowData();
        selectedItemIndex = pagination.getPageFirstItem() + getItems().getRowIndex();
        return "View";
    }

    public String prepareCreate() {
        current = new Refill();
        current.setRefillPK(new inttt.datenlogik.RefillPK());
        selectedItemIndex = -1;
        return "Create";
    }

    public String create() {
        try {
            current.getRefillPK().setProductID(current.getProducts().getProductID());
            current.getRefillPK().setStationID(current.getStation().getStationID());
            getFacade().create(current);
            JsfUtil.addSuccessMessage(ResourceBundle.getBundle("/ressources/Bundle").getString("RefillCreated"));
            return prepareCreate();
        } catch (Exception e) {
            JsfUtil.addErrorMessage(e, ResourceBundle.getBundle("/ressources/Bundle").getString("PersistenceErrorOccured"));
            return null;
        }
    }

    public String prepareEdit() {
        current = (Refill) getItems().getRowData();
        selectedItemIndex = pagination.getPageFirstItem() + getItems().getRowIndex();
        return "Edit";
    }

    public String update() {
        try {
            current.getRefillPK().setProductID(current.getProducts().getProductID());
            current.getRefillPK().setStationID(current.getStation().getStationID());
            getFacade().edit(current);
            JsfUtil.addSuccessMessage(ResourceBundle.getBundle("/ressources/Bundle").getString("RefillUpdated"));
            return "View";
        } catch (Exception e) {
            JsfUtil.addErrorMessage(e, ResourceBundle.getBundle("/ressources/Bundle").getString("PersistenceErrorOccured"));
            return null;
        }
    }

    public String destroy() {
        current = (Refill) getItems().getRowData();
        selectedItemIndex = pagination.getPageFirstItem() + getItems().getRowIndex();
        performDestroy();
        recreatePagination();
        recreateModel();
        return "List";
    }

    public String destroyAndView() {
        performDestroy();
        recreateModel();
        updateCurrentItem();
        if (selectedItemIndex >= 0) {
            return "View";
        } else {
            // all items were removed - go back to list
            recreateModel();
            return "List";
        }
    }

    private void performDestroy() {
        try {
            getFacade().remove(current);
            JsfUtil.addSuccessMessage(ResourceBundle.getBundle("/ressources/Bundle").getString("RefillDeleted"));
        } catch (Exception e) {
            JsfUtil.addErrorMessage(e, ResourceBundle.getBundle("/ressources/Bundle").getString("PersistenceErrorOccured"));
        }
    }

    private void updateCurrentItem() {
        int count = getFacade().count();
        if (selectedItemIndex >= count) {
            // selected index cannot be bigger than number of items:
            selectedItemIndex = count - 1;
            // go to previous page if last page disappeared:
            if (pagination.getPageFirstItem() >= count) {
                pagination.previousPage();
            }
        }
        if (selectedItemIndex >= 0) {
            current = getFacade().findRange(new int[]{selectedItemIndex, selectedItemIndex + 1}).get(0);
        }
    }

    public DataModel getItems() {
        if (items == null) {
            items = getPagination().createPageDataModel();
        }
        return items;
    }

    private void recreateModel() {
        items = null;
    }

    private void recreatePagination() {
        pagination = null;
    }

    public String next() {
        getPagination().nextPage();
        recreateModel();
        return "List";
    }

    public String previous() {
        getPagination().previousPage();
        recreateModel();
        return "List";
    }

    public SelectItem[] getItemsAvailableSelectMany() {
        return JsfUtil.getSelectItems(ejbFacade.findAll(), false);
    }

    public SelectItem[] getItemsAvailableSelectOne() {
        return JsfUtil.getSelectItems(ejbFacade.findAll(), true);
    }

    public Refill getRefill(inttt.datenlogik.RefillPK id) {
        return ejbFacade.find(id);
    }

    @FacesConverter(forClass = Refill.class)
    public static class RefillControllerConverter implements Converter {

        private static final String SEPARATOR = "#";
        private static final String SEPARATOR_ESCAPED = "\\#";

        @Override
        public Object getAsObject(FacesContext facesContext, UIComponent component, String value) {
            if (value == null || value.length() == 0) {
                return null;
            }
            RefillController controller = (RefillController) facesContext.getApplication().getELResolver().
                    getValue(facesContext.getELContext(), null, "refillController");
            return controller.getRefill(getKey(value));
        }

        inttt.datenlogik.RefillPK getKey(String value) {
            inttt.datenlogik.RefillPK key;
            String values[] = value.split(SEPARATOR_ESCAPED);
            key = new inttt.datenlogik.RefillPK();
            key.setRefillID(Integer.parseInt(values[0]));
            key.setStationID(Integer.parseInt(values[1]));
            key.setProductID(Integer.parseInt(values[2]));
            return key;
        }

        String getStringKey(inttt.datenlogik.RefillPK value) {
            StringBuilder sb = new StringBuilder();
            sb.append(value.getRefillID());
            sb.append(SEPARATOR);
            sb.append(value.getStationID());
            sb.append(SEPARATOR);
            sb.append(value.getProductID());
            return sb.toString();
        }

        @Override
        public String getAsString(FacesContext facesContext, UIComponent component, Object object) {
            if (object == null) {
                return null;
            }
            if (object instanceof Refill) {
                Refill o = (Refill) object;
                return getStringKey(o.getRefillPK());
            } else {
                throw new IllegalArgumentException("object " + object + " is of type " + object.getClass().getName() + "; expected type: " + Refill.class.getName());
            }
        }

    }

}
