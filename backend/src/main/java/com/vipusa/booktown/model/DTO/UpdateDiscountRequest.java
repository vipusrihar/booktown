package com.vipusa.booktown.model.DTO;

import com.vipusa.booktown.model.entity.Book;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UpdateDiscountRequest {

    private Float percentage;

    private LocalDate validFrom;

    private LocalDate validTo;

    private String code;

    private Boolean appliedToAll;

    private List<Book> appliedBooks = new ArrayList<>();

}
