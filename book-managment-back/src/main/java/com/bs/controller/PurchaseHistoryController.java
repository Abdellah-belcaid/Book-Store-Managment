package com.bs.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bs.model.PurchaseHistory;
import com.bs.repository.projection.IPurchaseItem;
import com.bs.service.IPurchaseHistoryService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/purchase-history") // pre-path
@AllArgsConstructor
public class PurchaseHistoryController {

	private final IPurchaseHistoryService purchaseHistoryService;

	@PostMapping // api/purchase-history
	public ResponseEntity<?> savePurchaseHistory(@RequestBody PurchaseHistory purchaseHistory) {
		return new ResponseEntity<>(purchaseHistoryService.savePurchaseHistory(purchaseHistory), HttpStatus.CREATED);
	}

	@GetMapping("{id}") // api/purchase-history
	public ResponseEntity<?> getAllPurchasesOfUser(@PathVariable Long id) {
		List<IPurchaseItem> purchaseHistories = purchaseHistoryService.findPurchasedItemsByUserId(id);
		return ResponseEntity.ok(purchaseHistories);
	}

	@GetMapping // api/purchase-history
	public ResponseEntity<?> getAllPurchases() {
		List<IPurchaseItem> purchaseHistories = purchaseHistoryService.findAllPurchaseItems();		
		return ResponseEntity.ok(purchaseHistories);
	}

}
