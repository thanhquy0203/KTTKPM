package state;

public class ProcessingState implements OrderState {
    public void handle(Order order) {
        System.out.println("Packing...");
        order.setState(new DeliveredState());
    }
}