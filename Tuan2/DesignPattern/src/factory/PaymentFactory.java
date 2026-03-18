package factory;

public class PaymentFactory {
    public static Payment create(String type) {
        if (type.equals("card")) return new CreditCard();
        if (type.equals("paypal")) return new Paypal();
        return null;
    }
}