package mq;

public class JavaConsumerExample {
    public static void main(String[] args) throws InterruptedException {
        RabbitMQ mq = new RabbitMQ();

        mq.init();
        mq.addConsumer("hello-rabbit", System.out::println);

        Thread.sleep(10000);
    }
}