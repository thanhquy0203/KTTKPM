package decorator;

public class TrackingDecorator implements OrderService {
    private OrderService service;

    public TrackingDecorator(OrderService service) {
        this.service = service;
    }

    public void process() {
        service.process();
        System.out.println("Add tracking");
    }
}