package com.bs.service;

import com.bs.dao.IPurchaseHistoryService;
import com.bs.model.PurchaseHistory;
import com.bs.repository.IPurchaseHistoryRepository;
import com.bs.repository.projection.IPurchaseItem;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
	public List<IPurchaseItem> findPurchasedItemsOfUser(Long userId) {
		return purchaseHistoryRepository.findAllPurchasesOfUser(userId);
	}
}
