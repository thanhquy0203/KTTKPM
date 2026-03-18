package factory;

public class CreditCard implements Payment {
    public void pay(double amount) {
        System.out.println("Pay " + amount + " by Card");
    }
}