package factory;

public class Paypal implements Payment {
    public void pay(double amount) {
        System.out.println("Pay " + amount + " by Paypal");
    }
    
}
