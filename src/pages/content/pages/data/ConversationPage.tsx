import { conversationListAtom, loadingAtom } from "@src/pages/content/context";
import { List as ConversationList } from "@src/pages/content/components/Conversation";
import { ListView } from "@src/pages/content/components/ListView";
import { categorizeConversations } from "@src/utils";
import { type Conversation } from "@src/types";
import { useState } from "react";
import { Spinner } from "@src/components/Spinner";
import { useAtom } from "jotai";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "@src/components/ui/select";
import { useEffect } from "react";
import {
  ClearSelectionButton,
  SelectAllButton,
  SelectionActionBar,
} from "@src/pages/content/components/SelectionActionBar";

const SortByOptions: Record<
  string,
  {
    label: string;
    key: keyof Conversation;
    params: {
      orderBy: keyof Conversation;
      desc: boolean;
    };
    sortFunction: (a: Conversation, b: Conversation) => number;
  }
> = {
  update_time_asc: {
    label: "Last updated (1-9)",
    key: "update_time",
    params: {
      orderBy: "update_time",
      desc: false,
    },
    sortFunction: (a: Conversation, b: Conversation) => {
      return (
        new Date(b.update_time).getTime() - new Date(a.update_time).getTime()
      );
    },
  },
  update_time_desc: {
    label: "Last updated (9-1)",
    key: "update_time",
    params: {
      orderBy: "update_time",
      desc: true,
    },
    sortFunction: (a: Conversation, b: Conversation) => {
      return (
        new Date(a.update_time).getTime() - new Date(b.update_time).getTime()
      );
    },
  },
  create_time_asc: {
    label: "Created time (1-9)",
    key: "create_time",
    params: {
      orderBy: "create_time",
      desc: false,
    },
    sortFunction: (a: Conversation, b: Conversation) => {
      return (
        new Date(a.create_time).getTime() - new Date(b.create_time).getTime()
      );
    },
  },
  create_time_desc: {
    label: "Created time (9-1)",
    key: "create_time",
    params: {
      orderBy: "create_time",
      desc: true,
    },
    sortFunction: (a: Conversation, b: Conversation) => {
      return (
        new Date(a.create_time).getTime() - new Date(b.create_time).getTime()
      );
    },
  },
};

export function ConversationPage() {
  const [sortByKey, setSortByKey] = useState<keyof typeof SortByOptions>(
    "update_time_asc" as keyof typeof SortByOptions
  );
  const [loading, seLoading] = useAtom(loadingAtom);
  const [conversationList, setConversationList] = useAtom(conversationListAtom);

  useEffect(() => {
    console.log("sort by", sortByKey);
    // setConversationList((p) => p.sort(SortByOptions[sortByKey].sortFunction));
  }, [sortByKey]);

  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Select
              onValueChange={(v) => {
                setSortByKey(v as keyof typeof SortByOptions);
              }}
              defaultValue="update_time"
            >
              <SelectTrigger>
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <span className="mr-2 text-sm">Order by</span>
              </SelectTrigger>
              <SelectContent align="end">
                {Object.keys(SortByOptions).map((key) => (
                  <SelectItem key={key} value={key}>
                    {SortByOptions[key].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <ListView
          dataAtom={conversationListAtom}
          renderData={({ data, selection, toggle }) =>
            data.length === 0 ? (
              <div>No data</div>
            ) : (
              Object.entries(
                categorizeConversations(data, SortByOptions[sortByKey].key)
              ).map(([key, value], i) => {
                if (value.length === 0) return <></>;
                return (
                  <div className="relative" key={i}>
                    <div
                      className="sticky top-0 py-3 text-sm text-slate-300 bg-background"
                      style={{
                        paddingLeft: "12px",
                        fontSize: "13px",
                        zIndex: `${10 + i * 2}`,
                      }}
                    >
                      {key}
                    </div>
                    <ConversationList
                      data={value}
                      selectionEnabled={selection.size !== 0}
                      toggle={toggle}
                      selection={selection}
                    />
                  </div>
                );
              })
            )
          }
          id="con-list"
          renderSelectionBar={({ selection, setSelection }) => (
            <SelectionActionBar
              enabled={selection.size !== 0}
              left={() => {
                return (
                  <>
                    <SelectAllButton
                      onClick={() => {
                        setSelection(
                          new Set(conversationList.map((c: any) => c.id))
                        );
                      }}
                    />
                    <ClearSelectionButton setSelection={setSelection} />
                  </>
                );
              }}
              right={() => (
                <>
                  <div className="icon-container icon-container-sm">
                    <MoreHorizontal />
                  </div>
                </>
              )}
            />
          )}
        />
      )}
    </>
  );
}