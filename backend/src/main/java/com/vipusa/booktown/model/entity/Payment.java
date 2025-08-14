package com.vipusa.booktown.model.entity;

import com.vipusa.booktown.model.enums.METHOD;
import com.vipusa.booktown.model.enums.STATUS;
import jakarta.persistence.*;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Positive;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Payment method is required")
    @Enumerated(EnumType.STRING)
    private METHOD paymentMethod;

    @NotNull(message = "Amount cannot be null")
    @Positive(message = "Amount must be positive")
    private Double amount;

    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    private STATUS status;

    @NotNull(message = "Transaction ID is required")
    @Column(unique = true)
    @Size(min = 10, max = 100, message = "Transaction ID length must be between 10 and 100")
    private String transactionId;

    @NotNull(message = "Payment date is required")
    private LocalDateTime paymentDate;

}

