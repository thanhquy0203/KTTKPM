package strategy;

public class NormalShipping implements ShippingStrategy {
    public void ship() {
        System.out.println("Normal shipping");
    }
}