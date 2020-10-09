package impl;

import interfaces.Multiplication;

import java.math.BigDecimal;

public class MultiplyOperation implements Multiplication {
    @Override
    public Double multiply(String a, String b) {
        return new BigDecimal(a).multiply(new BigDecimal(b)).doubleValue();
    }
}
