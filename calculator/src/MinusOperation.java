package impl;

import interfaces.Minus;

import java.math.BigDecimal;

public class MinusOperation implements Minus {
    @Override
    public Double subtract(String a, String b) {
        return new BigDecimal(a).subtract(new BigDecimal(b)).doubleValue();
    }
}
