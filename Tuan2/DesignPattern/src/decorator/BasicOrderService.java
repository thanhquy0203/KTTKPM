package decorator;

public class BasicOrderService implements OrderService {
    public void process() {
        System.out.println("Processing order...");
    }
}