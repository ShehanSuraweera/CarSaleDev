"use client";
import React, { SVGProps, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { AdData } from "../types";
import { deleteAd, fetchUserAds } from "../lib/api";
import Link from "next/link";
import toast from "react-hot-toast";
import ConfirmationModal from "./ConfirmationModal";
import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  PlusIcon,
  SearchIcon,
} from "./icons";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const columns = [
  { name: "AD TITLE", uid: "ad_title", sortable: true },
  { name: "CREATED AT", uid: "created_at", sortable: true },
  { name: "VIEWS", uid: "views", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Pending", uid: "pending" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  pending: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["ad_title", "views", "status", "actions"];

const MyadsContent = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [error, setError] = useState<string | null>(null);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const { loading, user } = useSelector((state: RootState) => state.user);
  const [ads, setAds] = useState<AdData[]>([]);
  const [isadsLoading, setIsAdsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [adIdToDelete, setAdIdToDelete] = useState<string>();
  const [tableRefresh, setTableRefresh] = useState(false);
  const router = useRouter();

  function parseTimestamp(timestamp: string): { date: string; time: string } {
    const date = new Date(timestamp);
    return {
      date: date.toISOString().split("T")[0], // Extracts YYYY-MM-DD
      time: date.toISOString().split("T")[1].slice(0, 8), // Extracts HH:MM:SS
    };
  }

  const deleteAdFunction = async () => {
    if (adIdToDelete) {
      const res = await deleteAd(adIdToDelete.toString());
      return res;
    }
    throw new Error("Ad ID to delete is undefined");
  };
  const handleConfirm = async () => {
    try {
      const result = await deleteAdFunction();
      if (result === "ad_deleted") {
        toast.success("Successfully deleted");
        setTableRefresh(!tableRefresh);
      } else {
        toast.error("Failed to delete ad");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the ad");
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    const getAdsFromBackend = async () => {
      if (!user) return;
      try {
        setIsAdsLoading(true);

        const fetchedAds = await fetchUserAds(user.id);
        setAds(fetchedAds);
      } catch (error: any) {
        setError(error.message || "Failed to load ads");
      } finally {
        setIsAdsLoading(false);
      }
    };

    getAdsFromBackend();
  }, [user, tableRefresh]);

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...ads];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((ad) =>
        ad.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((ad) =>
        Array.from(statusFilter).includes(ad.is_approved ? "active" : "pending")
      );
    }

    return filteredUsers;
  }, [ads, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  //   const handleAd = () => {
  //     router.push(`/vehicle/${id}`);
  //   };

  //   const handleEditAdButtton = () => {
  //     router.push(`/ad-edit/${id}`);
  //   };

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: AdData, b: AdData) => {
      const first = a[sortDescriptor.column as keyof AdData] as number;
      const second = b[sortDescriptor.column as keyof AdData] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (ad: AdData, columnKey: React.Key) => {
      const cellValue = ad[columnKey as keyof AdData];

      switch (columnKey) {
        case "ad_title":
          return (
            <Link href={`/vehicle/${ad.ad_id}`}>
              <User
                avatarProps={{ radius: "sm", src: ad.images[0] }}
                description={ad.price}
                name={ad.title}
              >
                {ad.title}
              </User>
            </Link>
          );
        case "created_at":
          return (
            <div className="flex flex-col">
              <p className="capitalize text-bold text-small">
                {parseTimestamp(ad.created_at).date}
              </p>
              <p className="capitalize text-bold text-tiny text-default-400">
                {parseTimestamp(ad.created_at).time}
              </p>
            </div>
          );
        //   case "owner_name":
        //     return (
        //       <div className="flex flex-col">
        //         <p className="capitalize text-bold text-small">
        //           {ad.owner_display_name}
        //         </p>
        //         {/* <p className="capitalize text-bold text-tiny text-default-400">
        //               {ad.created_at}
        //             </p> */}
        //       </div>
        //     );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[ad.is_approved ? "active" : "pending"]}
              size="sm"
              variant="flat"
            >
              {ad.is_approved ? "Active" : "Pending"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <Link
                  className="text-lg cursor-pointer text-default-400 active:opacity-50"
                  href={`/vehicle/${ad.ad_id}`}
                >
                  <EyeIcon />
                </Link>
              </Tooltip>
              <Tooltip content="Edit ad">
                <Link
                  className="text-lg cursor-pointer text-default-400 active:opacity-50"
                  href={`/ad-edit/${ad.ad_id}`}
                >
                  <EditIcon />
                </Link>
              </Tooltip>
              <Tooltip color="danger" content="Delete ad">
                <Button
                  variant="light"
                  color="danger"
                  className="text-lg cursor-pointer text-danger active:opacity-50 min-w-2 min-h-2"
                  onPress={() => {
                    setAdIdToDelete(ad.ad_id);
                    onOpen();
                  }}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return <>{JSON.stringify(cellValue)}</>;
      }
    },
    [setTableRefresh]
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 mt-10">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by title ..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button
              color="warning"
              endContent={<PlusIcon />}
              onPress={() => {
                router.push("/sell");
              }}
            >
              POST AD
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-default-400 text-small">
            Total {ads.length} ads
          </span>
          <div className="flex items-center gap-2 ">
            <Button
              className="min-w-2"
              variant="light"
              color="success"
              onPress={() => setTableRefresh(!tableRefresh)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </Button>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    ads.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[400px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        //removeWrapper
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No ads found"}
          items={sortedItems}
          isLoading={isadsLoading}
          loadingContent={<Spinner label="Loading..." />}
          className="text-xs "
        >
          {(item) => (
            <TableRow key={item.ad_id} className="text-xs ">
              {(columnKey) => (
                <TableCell key={columnKey}>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ConfirmationModal
        onConfirm={handleConfirm}
        isOpen={isOpen}
        onClose={onClose}
        title="Delete ad"
        message="Are you sure you want to delete this ad? This action cannot be undone, and all data associated with this ad will be permanently removed."
        confirmText="Yes, Delete"
        cancelText="No, Keep It"
        backdrop="blur"
      />
    </>
  );
};

export default MyadsContent;
