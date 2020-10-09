package impl;

import interfaces.Division;

import java.math.BigDecimal;

public class DivideOperation implements Division {
    @Override
    public Double divide(String a, String b) {
        return new BigDecimal(a).divide(new BigDecimal(b)).doubleValue();
    }
}
