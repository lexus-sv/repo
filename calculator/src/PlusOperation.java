package impl;

import interfaces.Plus;

import java.math.BigDecimal;

public class PlusOperation implements Plus {
    @Override
    public Double add(String a, String b) {
        return new BigDecimal(a).add(new BigDecimal(b)).doubleValue();
    }
}
