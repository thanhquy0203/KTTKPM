package state;

public class NewState implements OrderState {
    public void handle(Order order) {
        System.out.println("Check info");
        order.setState(new ProcessingState());
    }
}