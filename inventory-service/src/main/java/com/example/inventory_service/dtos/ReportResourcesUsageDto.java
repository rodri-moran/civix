package com.example.inventory_service.dtos;

import java.util.List;

public class ReportResourcesUsageDto {
    private Long reportId;
    private Long userId;
    private String reason;
    private List<ResourceUsedDetailDto> resourcesUsed;

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public List<ResourceUsedDetailDto> getResourcesUsed() {
        return resourcesUsed;
    }

    public void setResourcesUsed(List<ResourceUsedDetailDto> resourcesUsed) {
        this.resourcesUsed = resourcesUsed;
    }
}
