package main;

import decorator.BasicOrderService;
import decorator.OrderService;
import decorator.TrackingDecorator;
import factory.Payment;
import singleton.Database;
import state.Order;
import strategy.FastShipping;
import strategy.ShippingStrategy;

public class MainApp {
    public static void main(String[] args) {

        // singleton pattern
        Database db1 = Database.getInstance();
        Database db2 = Database.getInstance();
        db1.connect();
        db2.connect();
        System.out.println(db1 == db2); // true

        // factory pattern
        Payment payment1 = factory.PaymentFactory.create("card");
        payment1.pay(100);

        // state pattern
        Order o = new Order();
        o.process();
        o.process();
        o.process();

        // strategy pattern
        ShippingStrategy s = new FastShipping();
        s.ship();

        // decorator pattern
        OrderService service = new TrackingDecorator(new BasicOrderService());
        service.process();
    }
}