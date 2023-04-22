package com.bs.service.impl;

import com.bs.model.PurchaseHistory;
import com.bs.repository.IPurchaseHistoryRepository;
import com.bs.repository.projection.IPurchaseItem;
import com.bs.service.IPurchaseHistoryService;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PurchaseHistoryService implements IPurchaseHistoryService {

	private final IPurchaseHistoryRepository purchaseHistoryRepository;

	@Override
	public PurchaseHistory savePurchaseHistory(PurchaseHistory purchaseHistory) {
		purchaseHistory.setPurchaseTime(LocalDateTime.now());
		return purchaseHistoryRepository.save(purchaseHistory);
	}

	@Override
	public List<IPurchaseItem> findPurchasedItemsByUserId(Long userId) {
		Optional.ofNullable(userId).orElseThrow(() -> new IllegalArgumentException("User ID cannot be null"));

		return purchaseHistoryRepository.findAllPurchasesOfUser(userId);
	}

	@Override
	public List<IPurchaseItem> findAllPurchaseItems() {
		return purchaseHistoryRepository.findAllPurchaseItems();
	}

}
